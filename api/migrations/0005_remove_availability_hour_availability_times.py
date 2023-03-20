# Generated by Django 4.1.7 on 2023-03-20 02:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_availability'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='availability',
            name='hour',
        ),
        migrations.AddField(
            model_name='availability',
            name='times',
            field=models.JSONField(default=[]),
        ),
    ]
