# Generated by Django 4.1.1 on 2023-06-03 21:13

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="paciente",
            name="email",
            field=models.EmailField(default="", max_length=254),
        ),
        migrations.AddField(
            model_name="paciente",
            name="password",
            field=models.CharField(default="", max_length=100),
        ),
    ]
