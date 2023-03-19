from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from django.db import IntegrityError
from django.views import View
from django.http import HttpResponse, JsonResponse
import json
from .models import Date,Paciente
from django.core.mail import send_mail
from django.conf import settings
import dotenv
dotenv.load_dotenv()
import os
import time

class PacientDates(View):
    def get(self,request):
        dates = list(Date.objects.values())
        return JsonResponse({"data":dates})
    
    def post(self,request):
        time.sleep(3)
        
        jd = json.loads(request.body)
        pacient_id = jd["pacient_id"]
        date =jd["date"]
        hour = jd["hour"]
        pacient = Paciente.objects.get(id=pacient_id)
        Date.objects.create(pacient=pacient, date=date,hour=hour)
        return HttpResponse(status=201)
        

class Login(View):
    def get(self, request):
        return JsonResponse({"mensaje": "exito"})
    
    def post(self, request):
        datos = json.loads(request.body)
        email = datos["email"]
        contrasena = datos["contrasena"]
        user = authenticate(request, username=email, password=contrasena)
        if user is not None:
            if user.is_superuser:
                return HttpResponse("admin", status=201)
            else:
                # User is not an admin
                return HttpResponse("not admin", status=200)
        else:
            return HttpResponse("fallido", status=409)


class testing(View):
    def get(self, request):
        print(os.environ.get('VARIABLE_NAME'))   
        # subject = 'Test email'
        # message = 'awevoooooo ya jalaa'
        # from_email = 'consultoriomayratoluca@gmail.com'
        # recipient_list = ['yairmasterlol@gmail.com']
        # send_mail(subject, message, from_email, recipient_list)
        return HttpResponse("ok")

class CrearPaciente(View):
    def post(self, request):
        datos = json.loads(request.body)

        try:
            user = get_user_model().objects.create_user(
                email=datos["email"],
                password=datos["contrasena"],
               
                username=datos["nombres"],
                ap_paterno=datos["apPaterno"],
                ap_materno=datos["apMaterno"],
                celular=datos["celular"],
            )
            user.save()
            
            subject = 'Test email'
            message = json.dumps(datos)
            from_email = settings.EMAIL_HOST_USER
            recipient_list = [datos["email"]]
            send_mail(subject, message, from_email, recipient_list)

            return HttpResponse("creado con exito",status=200)
        except IntegrityError:
            return HttpResponse("error",status=400)

