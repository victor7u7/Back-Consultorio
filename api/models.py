from django.db import models
from django.contrib.auth.models import AbstractUser
import calendar

# Create your models here.


class Paciente(AbstractUser):
    username = models.CharField(max_length=200, unique=False)
    ap_paterno = models.CharField(
        max_length=100, verbose_name="Apellido paterno", default="", blank=True
    )
    ap_materno = models.CharField(
        max_length=100, verbose_name="Apellido materno", default="", blank=True
    )
    celular = models.CharField(
        max_length=15, verbose_name="Celular", default="", blank=True
    )
    email_token = models.CharField(
        max_length=100, verbose_name="Email token", default="", blank=True
    )
    is_active = models.BooleanField(default=False, verbose_name="Activo")


class Date(models.Model):
    pacient = models.ForeignKey(
        Paciente, on_delete=models.CASCADE, verbose_name="Paciente"
    )
    date = models.DateField()
    hour = models.TimeField()
    service = models.CharField(max_length=100, verbose_name="Servicio", blank=True)
    description = models.TextField(verbose_name="Descripción", blank=True)
    confirm = models.BooleanField(default=False, verbose_name="Confirmar Cita")

    def __str__(self) -> str:
        return self.pacient.username


class Availability(models.Model):
    month = models.IntegerField(verbose_name="Numero de mes")
    day = models.IntegerField(verbose_name="Numero de día")
    times = models.JSONField(default=[])
    year = models.IntegerField(default=2023, verbose_name="Año")

    def __str__(self) -> str:
        month_name = calendar.month_name[self.month]
        return f"{self.day} {month_name} {self.year}"
