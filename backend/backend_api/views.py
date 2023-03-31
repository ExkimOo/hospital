from django.contrib.auth import get_user_model, login, logout
from django.contrib.sessions.models import Session
from django.contrib.auth.models import User
from rest_framework import permissions, status, viewsets
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response

from backend_api.models import Audit, Room, User, Doctor, Patient, Schedule, Diagnosis
from backend_api.serializers import AuditSerializer, DoctorSerializer, PatientSerializer, DiagnosisSerializer, \
    ScheduleSerializer, UserSerializer, RoomSerializer, UserRegisterSerializer, UserLoginSerializer
from backend_api.validations import custom_validation, validate_email, validate_password, validate_username


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data
        assert validate_email(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


# class UserView(APIView):
#     permission_classes = (permissions.IsAuthenticated,)
#     authentication_classes = (SessionAuthentication,)
#
#     def get(self, request):
#         serializer = UserSerializer(request.user)
#         return Response({'user': serializer.data}, status=status.HTTP_200_OK)


class AuditView(APIView):
    def get(self, request):
        output = [
            {
                "id": output.id,
                "user": output.user,
                "action": output.action,
                "table": output.table,
                "created": output.created
            } for output in Audit.objects.all()
        ]
        return Response(output)

    def post(self, request):
        serializer = AuditSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


# class UserView(APIView):
#     def get(self, request):
#         output = [
#             {
#                 "id": output.id,
#                 "email": output.email,
#                 "username": output.username,
#                 "password": output.password,
#                 "role": output.role,
#             } for output in User.objects.all()
#         ]
#         return Response(output)
#
#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#             return Response(serializer.data)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class DoctorView(APIView):
    def get(self, request):
        output = [
            {
                "id": output.id,
                "birthdate": output.birthdate,
                "name": output.name,
                "specialization": output.specialization,
                "created": output.created,
                "userid": output.userid
            } for output in Doctor.objects.all()
        ]
        return Response(output)

    def post(self, request):
        serializer = DoctorSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class PatientView(APIView):
    def get(self, request):
        output = [
            {
                "id": output.id,
                "gender": output.gender,
                "insurance": output.insurance,
                "passport": output.passport,
                "name": output.name,
                "phone": output.phone,
                "created": output.created,
                "birthdate": output.birthdate,
                "userid": output.userid
            } for output in Patient.objects.all()
        ]
        return Response(output)

    def post(self, request):
        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class RoomView(APIView):
    def get(self, request):
        output = [
            {
                "id": output.id,
                "number": output.number,
                "name": output.name,
                "created": output.created
            } for output in Room.objects.all()
        ]
        return Response(output)

    def post(self, request):
        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class ScheduleView(APIView):
    def get(self, request):
        output = [
            {
                "doctorid": output.doctorid,
                "roomid": output.roomid,
                "id": output.id,
                "worktime": output.worktime,
                "days": output.days
            } for output in Schedule.objects.all()
        ]
        return Response(output)

    def post(self, request):
        serializer = ScheduleSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class DiagnosisView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        output = [
            {
                "id": output.id,
                "patientid": output.patientid,
                "doctorid": output.doctorid,
                "disease": output.disease,
                "visitdate": output.visitdate
            } for output in Diagnosis.objects.all()
        ]
        return Response(output)

    def post(self, request):
        serializer = DiagnosisSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class UserProfile(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user_id = request.user.id
        output = User.objects.get(pk=user_id)
        return Response({"id": output.id,
                         "email": output.email,
                         "username": output.username,
                         "role": output.role})


class AdminAudit(APIView):
    permission_classes = (permissions.IsAdminUser)

    def get(self, request):
        # user_id = request.user.id
        # output = User.objects.get(pk=user_id)
        output = [
            {
                "id": output.id,
                "action": output.action,
                "user": output.user,
                "table": output.table,
                "created": output.created
            } for output in Audit.objects.all()
        ]
        return Response(output)


class ScheduleTable(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        raw_query = '''SELECT  1 as id,
                                r.number,
                                r.name,
                                d.name AS doctorname,
                                d.specialization,
                                s.days,
                                s.worktime
                       FROM "backend_api_schedule" s
                       INNER JOIN "backend_api_room" r ON r.id = s.room_id
                       INNER JOIN "backend_api_doctor" d ON d.id = s.doctor_id;'''
        table = Schedule.objects.raw(raw_query)
        output = [
            {
                "number": output.number,
                "room_name": output.name,
                "doctor_name": output.doctorname,
                "doctor_specialization": output.specialization,
                "work_days": output.days,
                "work_hours": output.worktime
            } for output in table
        ]
        return Response(output)


class DiagnosisUser(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user_role = request.user.role
        user_id = request.user.id

        match user_role:
            case "Admin":
                raw_query = '''SELECT 1 as id,
                                      doc.id AS doctor_id,
                                      doc.name AS doctor_name,
                                      doc.specialization AS doctor_specialization,
                                      p.id AS patient_id,
                                      p.name AS patient_name,
                                      diag.id AS diagnosis_id,
                                      diag.visitdate AS visit_date
                               FROM "backend_api_diagnosis" as diag
                               JOIN "backend_api_patient" p ON p.id = diag.patient_id
                               JOIN "backend_api_doctor" doc ON doc.id = diag.doctor_id;'''
                table = Diagnosis.objects.raw(raw_query)
                output = [
                    {
                        "Doctor ID": output.doctor_id,
                        "Doctor Name": output.doctor_name,
                        "Doctor Specialization": output.doctor_specialization,
                        "Patient ID": output.patient_id,
                        "Patient Name": output.patient_name,
                        "Diagnosis ID": output.diagnosis_id,
                        "Visit Date": output.visit_date
                    } for output in table
                ]
            case "Doctor":
                raw_query = f''' SELECT p.id,
                                        p.name,
                                        p.birthdate,
                                        p.gender,
                                        d.disease,
                                        d.visitdate
                                        FROM "backend_api_diagnosis" d
                                        JOIN "backend_api_patient" p ON d.patient_id = p.id
                                        WHERE d.doctor_id = (( SELECT "backend_api_doctor".id
                                                                        FROM "backend_api_doctor"
                                                                        WHERE "backend_api_doctor".user_id = {user_id}));'''
                table = Diagnosis.objects.raw(raw_query)
                output = [
                    {
                        "Patient ID": output.id,
                        "Name": output.name,
                        "Birthdate": output.birthdate,
                        "Gender": output.gender,
                        "Disease": output.disease,
                        "Visit Date": output.visitdate,
                    } for output in table
                ]
            case "Patient":
                raw_query = f'''SELECT 1 as id,
                                       diag.disease,
                                       doc.name AS doctorname,
                                       doc.specialization,
                                       diag.visitdate
                                FROM "backend_api_diagnosis" diag
                                JOIN "backend_api_doctor" doc ON doc.id = diag.doctor_id
                                WHERE diag.patient_id = ((SELECT "backend_api_patient".id
                                                         FROM "backend_api_patient"
                                                         WHERE "backend_api_patient".user_id = {user_id}));'''
                table = Diagnosis.objects.raw(raw_query)
                output = [
                    {
                        "Doctor Name": output.doctorname,
                        "Specialization": output.specialization,
                        "Disease": output.disease,
                        "Visit Date": output.visitdate,
                    } for output in table
                ]
            case _:
                raise Exception("Wrong user role.")

        return Response(output)
