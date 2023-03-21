from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from django.db import IntegrityError
from django.views import View
from django.http import HttpResponse, JsonResponse
import json
from .models import Date,Paciente,Availability
from django.core.mail import send_mail
from django.conf import settings
import dotenv
dotenv.load_dotenv()
import os
import time
from datetime import datetime


class AvailabilityView(View):
    def get(self,request,month=0):
        if month>0:
            availability =  list(Availability.objects.filter(month=month).values())
        else:
            availability = list(Availability.objects.values())
        return JsonResponse({"availability":availability})
    def post(self,request):
        jd = json.loads(request.body)
        Availability.objects.create(**jd)
        return HttpResponse(status=201)
    
    def put(self,request,day,month,year):
        jd = json.loads(request.body)
        Availability.objects.filter(day=day,month=month,year=year).update(**jd)
        return HttpResponse("ok updated",status=200)
    def delete(self,request,day,month,year):
        Availability.objects.filter(day=day,month=month,year=year).delete()
        return HttpResponse("ok deleted",status=200)
class PacientDates(View):
    def get(self,request):
        dates = Date.objects.select_related('pacient').values('id', 'date', 'hour', 'service', 'description', 'confirm', 'pacient__username','pacient__celular','pacient__email')
        for date in dates:
            hour = datetime.strptime(str(date['hour']), '%H:%M:%S').strftime('%I:%M %p')
            date['hour'] = hour
        return JsonResponse({"data": list(dates)})
    
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
class testing(View):
    def get(self, request):
        print(os.environ.get('VARIABLE_NAME'))   
        # subject = 'Test email'
        # message = 'awevoooooo ya jalaa'
        # from_email = 'consultoriomayratoluca@gmail.com'
        # recipient_list = ['yairmasterlol@gmail.com']
        # send_mail(subject, message, from_email, recipient_list)
        return HttpResponse("ok")
