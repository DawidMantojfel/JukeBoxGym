import requests

from .models import SpotifyToken
from django.utils import timezone
from datetime import timedelta
from .credentials import CLIENT_ID, CLIENT_SECRET
from requests import post, put, get
from django.urls import reverse
from django.core.exceptions import PermissionDenied
from rest_framework import status

ACCOUNTS_SPOTIFY_ENDPOINT = 'https://accounts.spotify.com'
SPOTIFY_TOKEN_ENDPOINT = ACCOUNTS_SPOTIFY_ENDPOINT + '/api/token'
SPOTIFY_AUTHORIZE_ENDPOINT = ACCOUNTS_SPOTIFY_ENDPOINT + '/authorize'

BASE_URL = "https://api.spotify.com/v1/me/"


def get_latest_user_token(session_id):
    user_token = SpotifyToken.objects.filter(user=session_id).order_by('-created_at')

    if user_token.exists():
        return user_token[0]
    else:
        return None


def db_save_or_update_token(session_id, access_token, token_type, expires_in, refresh_token):
    expires_in = timezone.now() + timedelta(seconds=expires_in)

    if refresh_token or access_token:
        token, _ = SpotifyToken.objects.update_or_create(
            user=session_id,
            defaults={
                'access_token': access_token,
                'refresh_token': refresh_token,
                'token_type': token_type,
                'expires_in': expires_in
            }
        )


def is_spotify_authenticated(session_id):
    token = get_latest_user_token(session_id)
    if token:
        if _is_token_expired(token):
            refresh_spotify_token(session_id, token)

        return True

    return False


def refresh_spotify_token(session_id, token):
    response = post(SPOTIFY_TOKEN_ENDPOINT, data={
        'grant_type': 'refresh_token',
        'refresh_token': token.refresh_token,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')
    refresh_token = response.get('refresh_token')

    db_save_or_update_token(
        session_id, access_token, token_type, expires_in, refresh_token)


def execute_spotify_api_request(session_id, endpoint, post_=False, put_=False):
    if is_spotify_authenticated(session_id):
        token = get_latest_user_token(session_id)
        headers = {'Content-Type': 'application/json',
                   'Authorization': "Bearer " + token.access_token}

        if post_:
            response = post(BASE_URL + endpoint, headers=headers)
        elif put_:
            response = put(BASE_URL + endpoint, headers=headers)
        else:
            response = get(BASE_URL + endpoint, {}, headers=headers)

        if response.status_code == status.HTTP_204_NO_CONTENT:
            return None

        try:
            return response.json()
        except:
            return {'Error': 'Issue with request'}
    else:
        raise PermissionDenied


def _is_token_expired(token):
    return token.expires_in <= timezone.now()


def play_song(session_id):
    response = execute_spotify_api_request(session_id, "player/play", put_=True)
    print("play song response: \n")
    print(response)
    return response


def pause_song(session_id):
    response = execute_spotify_api_request(session_id, "player/pause", put_=True)
    print("pause song response: \n")
    print(response)
    return response


def skip_song(session_id):
    response = execute_spotify_api_request(session_id, "player/next", post_=True)
    print("skip song response: \n")
    print(response)
    return response
