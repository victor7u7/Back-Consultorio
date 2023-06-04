from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from django.views import View
from django.http import HttpResponse, JsonResponse
import json
from datetime import date
from .models import Date, Paciente, Availability
from django.core.mail import send_mail
from django.conf import settings
import dotenv
from django.db.models import Q
import calendar
import datetime
from django.forms.models import model_to_dict

dotenv.load_dotenv()


class AvailabilityView(View):
    def get(self, request, year=0, month=0):
        if month > 0 and year > 0:
            availability = list(
                Availability.objects.filter(
                    Q(available_date__year=year) & Q(available_date__month=month)
                ).values()
            )
        else:
            availability = list(Availability.objects.values())
        return JsonResponse({"availability": availability})

    def post(self, request):
        jd = json.loads(request.body)
        Availability.objects.create(**jd)
        return HttpResponse(status=201)

    def put(self, request, year, month, day, user_id):
        jd = json.loads(request.body)
        specific_date = date(year, month, day)
        Date.objects.create(pacient_id=user_id, date=specific_date, hour=jd["del_time"])
        availability = Availability.objects.get(available_date__exact=specific_date)
        times = availability.times
        item_to_delete = jd["del_time"]
        if item_to_delete in times:
            times.remove(item_to_delete)
            availability.save()
            if not times:
                availability.delete()
        return HttpResponse("ok updated", status=200)

    def delete(self, request, day, month, year):
        Availability.objects.filter(day=day, month=month, year=year).delete()
        return HttpResponse("ok deleted", status=200)


class AvailabilityAdminView(View):
    def put(self, request, year, month, day):
        jd = json.loads(request.body)
        times = jd["new_times"]
        specific_date = date(year, month, day)
        try:
            availability = Availability.objects.get(available_date__exact=specific_date)
            print(times)
            if not times:
                availability.delete()
            else:
                availability.times = jd["new_times"]
                availability.save()
        except Availability.DoesNotExist:
            if times:
                availability = Availability.objects.create(
                    available_date=specific_date, times=times
                )
        return HttpResponse("oki", 200)


# class Patient(View):


class PacientDates(View):
    def get(self, request):
        dates = list(
            Date.objects.select_related("pacient").values(
                "id",
                "date",
                "hour",
                "service",
                "description",
                "confirm",
                "pacient__username",
                "pacient__celular",
                "pacient__email",
            )
        )
        return JsonResponse({"data": dates})


class NotesView(View):
    def post(self, request, date_id):
        jd = json.loads(request.body)
        date = Date.objects.get(id=date_id)
        print(date.hour)
        date.description = jd["text"]
        date.save()
        return HttpResponse("oki", status=200)


# class PacientDates(View):
#     def get(self, request, pacient_id=0):
#         if pacient_id > 0:
#             date = Date.objects.filter(pacient__id=pacient_id).first()
#             if date is not None:
#                 return JsonResponse({"date": [date.date, date.hour]}, status=200)
#             else:
#                 return HttpResponse(status=404)
#         else:
#             dates = Date.objects.select_related("pacient").values(
#                 "id",
#                 "date",
#                 "hour",
#                 "service",
#                 "description",
#                 "confirm",
#                 "pacient__username",
#                 "pacient__celular",
#                 "pacient__email",
#             )
#             for date in dates:
#                 hour = datetime.strptime(str(date["hour"]), "%H:%M:%S").strftime(
#                     "%I:%M %p"
#                 )
#                 date["hour"] = hour
#             return JsonResponse({"data": list(dates)})

#     def post(self, request):
#         time.sleep(3)

#         jd = json.loads(request.body)
#         pacient_id = jd["pacient_id"]
#         date = jd["date"]
#         hour = jd["hour"]
#         pacient = Paciente.objects.get(id=pacient_id)
#         Date.objects.create(pacient=pacient, date=date, hour=hour)
#         return HttpResponse(status=201)


# class Login(View):
#     def get(self, request):
#         return JsonResponse({"mensaje": "exito"})

#     def post(self, request):
#         datos = json.loads(request.body)
#         email = datos["email"]
#         contrasena = datos["contrasena"]
#         user = authenticate(request, username=email, password=contrasena)
#         if user is not None:
#             user_dict = model_to_dict(user)
#             if user.is_superuser:
#                 return JsonResponse({"user": user_dict}, status=202)
#             else:
#                 # User is not an admin
#                 return JsonResponse({"user": user_dict}, status=200)

#         else:
#             return HttpResponse("fallido", status=409)


class VerifyEmail(View):
    def post(self, request):
        jd = json.loads(request.body)
        User = get_user_model()
        User = User.objects.get(id=jd["user_id"])
        token = jd["token"]
        if User.email_token == token:
            User.is_active = True
            User.save()
            return HttpResponse("success", status=200)
        else:
            return HttpResponse("error", status=409)


class PatientSignup(View):
    def post(self, request):
        jd = json.loads(request.body)
        # print(jd["celular"], jd["email"])
        try:
            print("lolis")
            Paciente.objects.get(Q(email=jd["email"]) | Q(celular=jd["celular"]))
            return HttpResponse("exists", status=405)
        except Paciente.DoesNotExist:
            print("jere**************")
            patient = Paciente.objects.create(**jd)
            patient.save()

            return HttpResponse("oki", status=200)


class PatientLogin(View):
    def post(self, request):
        jd = json.loads(request.body)
        try:
            patient = Paciente.objects.get(Q(email=jd["dato"]) | Q(celular=jd["dato"]))
            if patient.password == jd["contrasena"]:
                patient_data = {
                    "id": patient.id,
                    "username": patient.username,
                }

                return JsonResponse(
                    {"user": patient_data}, status=202 if patient.is_admin else 200
                )
            else:
                return HttpResponse("incorrect", status=400)
        except Paciente.DoesNotExist:
            return HttpResponse("bad", status=500)


# class CrearPaciente(View):
#     def get(self, request):
#         token = secrets.token_hex(17)
#         User = get_user_model()
#         User = User.objects.get(id=88)
#         User.email_token = token
#         User.save()
#         subject = "Test email"
#         from_email = settings.EMAIL_HOST_USER
#         recipient_list = ["yairmasterlol@gmail.com"]
#         send_mail(
#             subject, f"{settings.SITE}/verify/{token}/{88}", from_email, recipient_list
#         )
#         return JsonResponse({"mensaje": token})

#     def post(self, request):
#         datos = json.loads(request.body)
#         try:
#             User = get_user_model()
#             user = User.objects.get(
#                 Q(email=datos["email"]) | Q(celular=datos["celular"])
#             )
#             print(user.email, "//****")
#             return HttpResponse("Correo y/o Celular ya existen", status=405)
#         except ObjectDoesNotExist:
#             try:
#                 token = secrets.token_hex(17)
#                 user = get_user_model().objects.create_user(
#                     email=datos["email"],
#                     password=datos["contrasena"],
#                     username=datos["nombres"],
#                     ap_paterno=datos["apPaterno"],
#                     ap_materno=datos["apMaterno"],
#                     celular=datos["celular"],
#                     email_token=token,
#                 )
#                 user.save()

#                 subject = "Test email"
#                 message = f"{settings.SITE}/verify/{token}/{user.id}"
#                 from_email = settings.EMAIL_HOST_USER
#                 recipient_list = [datos["email"]]
#                 send_mail(subject, message, from_email, recipient_list)


#                 return HttpResponse("creado con exito", status=200)
#             except IntegrityError:
#                 return HttpResponse("error", status=400)
def get_all_wednesdays(year, month, days):
    _, num_days = calendar.monthrange(year, month)

    for day in range(1, num_days + 1):
        date = datetime.date(year, month, day)
        if date.weekday() == 2:
            Availability.objects.create(
                available_date=str(date), times=["15:00", "18:00", "19:00"]
            )
        elif date.weekday() == 5:
            Availability.objects.create(
                available_date=str(date), times=["08:30", "13:00", "14:00"]
            )


class testing(View):
    def get(self, request):
        get_all_wednesdays(2023, 6, [2, 5])
        # print(os.environ.get("VARIABLE_NAME"))
        # subject = 'Test email'
        # message = 'awevoooooo ya jalaa'
        # from_email = 'consultoriomayratoluca@gmail.com'
        # recipient_list = ['yairmasterlol@gmail.com']
        # send_mail(subject, message, from_email, recipient_list)

        return HttpResponse("ok")
