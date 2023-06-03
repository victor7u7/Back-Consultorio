from django.urls import path

# Create your models here.
from .views import (
    Login,
    # CrearPaciente,
    testing,
    # PacientDates,
    AvailabilityView,
    VerifyEmail,
    AvailabilityAdminView,
)
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path("login", csrf_exempt(Login.as_view()), name="login"),
    # path("signup", csrf_exempt(CrearPaciente.as_view()), name="signup"),
    path("test", csrf_exempt(testing.as_view()), name="tes"),
    # path("dates", csrf_exempt(PacientDates.as_view()), name="dates"),
    path("verify", csrf_exempt(VerifyEmail.as_view()), name="verify"),
    # path("dates/<int:pacient_id>", csrf_exempt(PacientDates.as_view()), name="dates"),
    path("able", csrf_exempt(AvailabilityView.as_view()), name="able"),
    path(
        "able/<int:year>/<int:month>",
        csrf_exempt(AvailabilityView.as_view()),
        name="able",
    ),
    path(
        "able/<int:year>/<int:month>/<int:day>",
        csrf_exempt(AvailabilityView.as_view()),
        name="able",
    ),
    path(
        "adminCal/<int:year>/<int:month>/<int:day>",
        csrf_exempt(AvailabilityAdminView.as_view()),
        name="able admin",
    ),
    path("able", csrf_exempt(AvailabilityView.as_view()), name="able"),
]
