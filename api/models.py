import string

from django.db import models
import random
# from django.contrib.gis.db import models as gis_models


def generate_unique_code():
    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break

    return code


# Create your models here.
class Artist(models.Model):
    name = models.CharField(max_length=10)


class Album(models.Model):
    name = models.CharField(max_length=20, default="")
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=False)


class Song(models.Model):
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    name = models.CharField(max_length=20, default="")
    album = models.ForeignKey(Album, on_delete=models.RESTRICT)


class GymEntity(models.Model):
    name = models.CharField(max_length=20, default="")
    location = models.CharField(max_length=20, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    city = models.CharField(max_length=20)


class Room(models.Model):
    name = models.CharField(max_length=20, default="")
    code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    current_song = models.CharField(max_length=50, null=True)
    gym = models.ForeignKey(GymEntity, on_delete=models.CASCADE)


