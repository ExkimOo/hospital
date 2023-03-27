from django.contrib.auth import get_user_model, login, logout
from django.shortcuts import render
from rest_framework import permissions, status
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response

from backend_api.models import Audit, Room, User, Doctor, Patient, Schedule, Diagnosis
from backend_api.serializers import AuditSerializer, DoctorSerializer, PatientSerializer, DiagnosisSerializer, \
    ScheduleSerializer, UserSerializer, RoomSerializer, UserRegisterSerializer, UserLoginSerializer
from backend_api.validations import custom_validation, validate_email, validate_password, validate_username


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
	permission_classes = (permissions.AllowAny, )
	authentication_classes = (SessionAuthentication, )

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
	permission_classes = (permissions.AllowAny, )
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)


class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated, )
	authentication_classes = (SessionAuthentication, )

	def get(self, request):
		serializer = UserSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)


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


class UserView(APIView):
    def get(self, request):
        output = [
            {
                "id": output.id,
                "login": output.login,
                "password": output.password,
                "role": output.role,
                "created": output.created,
                "active": output.active
            } for output in User.objects.all()
        ]
        return Response(output)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


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
