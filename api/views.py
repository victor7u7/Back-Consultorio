from django.contrib.auth import get_user_model
from django.views import View
from django.http import HttpResponse, JsonResponse
import json
from datetime import date
from .models import Date, Paciente, Availability
from django.conf import settings
import dotenv
from django.db.models import Q
from django.forms.models import model_to_dict
from django.core.mail import send_mail
from datetime import datetime

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


def transform_date(date):
    date_string = date
    date_object = datetime.strptime(date_string, "%Y-%m-%d")
    spanish_date_format = date_object.strftime("%d/%m/%Y")
    return spanish_date_format


class ConfirmDate(View):
    def post(self, request):
        jd = json.loads(request.body)
        subject = "Confirmación de cita"
        from_email = "consultoriomayratoluca@gmail.com"
        for cita in jd["dates"]:
            # print(cita["pacient__username"])
            cita_id = cita["id"]
            date_sel = Date.objects.get(id=cita_id)
            date_sel.confirm = True
            date_sel.save()
            pacient_name = cita["pacient__username"]
            fecha = transform_date(cita["date"])
            hour = cita["hour"]
            message = f"Hola {pacient_name} tu cita está confirmada para {fecha} a las {hour} hrs"
            recipient_list = [cita["pacient__email"]]
            send_mail(subject, message, from_email, recipient_list)
        return HttpResponse("OK", 200)


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
                "pacient__id",
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
                    "admin": patient.is_admin,
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
