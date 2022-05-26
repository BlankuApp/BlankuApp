from dataclasses import fields
from rest_framework import serializers
from .models import Account, UserProfile
from .models import SenCard


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'email', 'username', 'password', 'language']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        profile = UserProfile.objects.create(user=instance)
        return instance


class SenCardSerializeer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    trans = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()
    liker_names = serializers.SerializerMethodField()
    read_by_me = serializers.SerializerMethodField()
    liked_by_me = serializers.SerializerMethodField()
    saved_by_me = serializers.SerializerMethodField()
    date = serializers.SerializerMethodField()
    full_text = serializers.SerializerMethodField()

    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop('user')
        userProf = UserProfile.objects.filter(user=self.user).first()
        self.userProf = userProf
        super().__init__(*args, **kwargs)

    class Meta:
        model = SenCard
        fields = ['id', 'Qtext', 'Atext', 'CERF', 'morph', 'succeed', 'reviewed', 'user', 'trans',
                  'likes_count', 'liker_names', 'read_by_me', 'liked_by_me', 'saved_by_me', 'date', 'full_text']

    def get_user(self, obj):
        return obj.user.username

    def get_full_text(self, obj):
        return obj.sent.text

    def get_trans(self, obj):
        if self.user.language == 'cn':
            items = obj.sent.cnsent_set.select_related(
                'ensent').all().order_by('-point')
        elif self.user.language == 'es':
            items = obj.sent.essent_set.select_related(
                'ensent').all().order_by('-point')
        elif self.user.language == 'hi':
            items = obj.sent.hisent_set.select_related(
                'ensent').all().order_by('-point')
        elif self.user.language == 'bn':
            items = obj.sent.bnsent_set.select_related(
                'ensent').all().order_by('-point')
        elif self.user.language == 'pt':
            items = obj.sent.ptsent_set.select_related(
                'ensent').all().order_by('-point')
        elif self.user.language == 'ru':
            items = obj.sent.rusent_set.select_related(
                'ensent').all().order_by('-point')
        elif self.user.language == 'jp':
            items = obj.sent.jpsent_set.select_related(
                'ensent').all().order_by('-point')
        elif self.user.language == 'tr':
            items = obj.sent.trsent_set.select_related(
                'ensent').all().order_by('-point')
        elif self.user.language == 'ko':
            items = obj.sent.kosent_set.select_related(
                'ensent').all().order_by('-point')
        elif self.user.language == 'fr':
            items = obj.sent.frsent_set.select_related(
                'ensent').all().order_by('-point')
        elif self.user.language == 'de':
            items = obj.sent.desent_set.select_related(
                'ensent').all().order_by('-point')
        elif self.user.language == 'fa':
            items = obj.sent.fasent_set.select_related(
                'ensent').all().order_by('-point')
        elif self.user.language == 'ar':
            items = obj.sent.arsent_set.select_related(
                'ensent').all().order_by('-point')
        elif self.user.language == 'id':
            items = obj.sent.idsent_set.select_related(
                'ensent').all().order_by('-point')
        elif self.user.language == 'nl':
            items = obj.sent.nlsent_set.select_related(
                'ensent').all().order_by('-point')
        output = []
        for item in items:
            output.append({
                'id': item.id,
                'ensent': item.ensent.id,
                'text': item.text,
                'point': item.point,
                'user': item.user.username})

        return output

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_liker_names(self, obj):
        output = []
        for item in obj.likes.all()[:5]:
            output.append(item.username)
        return output

    def get_read_by_me(self, obj):
        try:
            obj.readtable_set.get(user=self.user)
            return True
        except:
            return False

    def get_liked_by_me(self, obj):
        try:
            obj.liketable_set.get(user=self.user)
            return True
        except:
            return False

    def get_saved_by_me(self, obj):

        try:
            obj.savetable_set.get(userProf=self.userProf)
            return True
        except:
            return False

    def get_date(self, obj):
        return obj.data_created.strftime("%y/%m/%d")
