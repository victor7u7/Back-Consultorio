from django.urls import path

# Create your models here.
from .views import Login, CrearPaciente, testing, PacientDates, AvailabilityView
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path("login", csrf_exempt(Login.as_view()), name="login"),
    path("signup", csrf_exempt(CrearPaciente.as_view()), name="signup"),
    path("test", csrf_exempt(testing.as_view()), name="tes"),
    path("dates", csrf_exempt(PacientDates.as_view()), name="dates"),
    path("dates/<int:pacient_id>", csrf_exempt(PacientDates.as_view()), name="dates"),
    path("able/<int:month>", csrf_exempt(AvailabilityView.as_view()), name="able"),
    path(
        "able/<int:day>/<int:month>/<int:year>",
        csrf_exempt(AvailabilityView.as_view()),
        name="able",
    ),
    path("able", csrf_exempt(AvailabilityView.as_view()), name="able"),
]
