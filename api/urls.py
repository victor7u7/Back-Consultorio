from django.urls import path
from .views import (
    AvailabilityView,
    VerifyEmail,
    AvailabilityAdminView,
    PatientSignup,
    PatientLogin,
    PacientDates,
    NotesView,
    ConfirmDate,
)
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path("login", csrf_exempt(PatientLogin.as_view()), name="login"),
    path("signup", csrf_exempt(PatientSignup.as_view()), name="signup"),
    path("dates", csrf_exempt(PacientDates.as_view()), name="dates"),
    path("verify", csrf_exempt(VerifyEmail.as_view()), name="verify"),
    path("notes/<int:date_id>", csrf_exempt(NotesView.as_view()), name="notes"),
    path("able", csrf_exempt(AvailabilityView.as_view()), name="able"),
    path(
        "able/<int:year>/<int:month>",
        csrf_exempt(AvailabilityView.as_view()),
        name="able",
    ),
    path(
        "able/<int:year>/<int:month>/<int:day>/<int:user_id>",
        csrf_exempt(AvailabilityView.as_view()),
        name="able",
    ),
    path(
        "adminCal/<int:year>/<int:month>/<int:day>",
        csrf_exempt(AvailabilityAdminView.as_view()),
        name="able admin",
    ),
    path("able", csrf_exempt(AvailabilityView.as_view()), name="able"),
    path("confirm", csrf_exempt(ConfirmDate.as_view()), name="confirm"),
]
