# Generated by Django 4.1.3 on 2023-06-24 12:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spotify', '0005_alter_vote_current_song'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spotifytoken',
            name='refresh_token',
            field=models.CharField(max_length=2000, null=True),
        ),
    ]