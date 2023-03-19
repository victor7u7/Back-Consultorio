from django.urls import path
# Create your models here.
from .views import Login,CrearPaciente,testing,PacientDates
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('login',csrf_exempt(Login.as_view()), name="login"),
    path('signup',csrf_exempt(CrearPaciente.as_view()), name="signup"),
    path('test',csrf_exempt(testing.as_view()), name="tes"),
    path('dates',csrf_exempt(PacientDates.as_view()), name="dates"),
]