# Generated by Django 4.1.1 on 2023-06-03 23:04

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0003_paciente_is_admin"),
    ]

    operations = [
        migrations.AlterField(
            model_name="date",
            name="date",
            field=models.DateField(null=True),
        ),
        migrations.AlterField(
            model_name="date",
            name="hour",
            field=models.CharField(default="0", max_length=10, verbose_name="Hora"),
        ),
    ]
