from rest_framework import serializers
from .models import Album, Artist, Song, Room, GymEntity


class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist


class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'code', 'host', 'guest_can_pause',
                  'votes_to_skip', 'created_at')


class GymEntitySerializer(serializers.ModelSerializer):
    class Meta:
        model = GymEntity
        fields = ('name', 'created_at', 'location', 'city')


class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('guest_can_pause', 'votes_to_skip')


class UpdateRoomSerializer(serializers.ModelSerializer):
    code = serializers.CharField(validators=[])

    class Meta:
        model = Room
        fields = ('guest_can_pause', 'votes_to_skip', 'code')
