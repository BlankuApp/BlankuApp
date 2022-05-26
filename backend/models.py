from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class EnWord(models.Model):
    stem = models.CharField(max_length=30, default='')
    pos = models.CharField(max_length=4, default='')
    CERF = models.CharField(max_length=2, default='OL')
    freq = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)

    class Meta:
        unique_together = ('stem', 'pos')

    def __str__(self):
        return "%s %s" % (self.stem, self.pos)


class MyAccountManager(BaseUserManager):
    def create_user(self, email, username, language, password=None):
        user = self.model(
            email=self.normalize_email(email),
            username=username,
            language=language
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, language, password=None):
        user = self.model(
            email=self.normalize_email(email),
            username=username,
            language=language
        )

        user.set_password(password)
        user.save(using=self._db)
        user.is_superuser = True
        return user

#  https://www.youtube.com/watch?v=PUzgZrS_piQ?


class Account(AbstractBaseUser):
    LANGUAGE_CHOICES = [
        ('cn', 'Simplified Chinese'),
        ('jp', 'Japanese'),
        ('fa', 'Persian'),
        ('es', 'Spanish'),
        ('hi', 'Hindi'),
        ('bn', 'Bengali'),
        ('pt', 'Portuguese'),
        ('ru', 'Russian'),
        ('tr', 'Turkish'),
        ('ko', 'Korean'),
        ('fr', 'French'),
        ('de', 'German'),
        ('ar', 'Arabic'),
        ('id', 'Indonesian'),
        ('nl', 'Dutch')
    ]

    email = models.EmailField(verbose_name='email', max_length=60, unique=True)
    username = models.CharField(
        verbose_name='username', max_length=30, unique=True)
    name = models.CharField(
        verbose_name='name', max_length=30, default='guest')
    date_joined = models.DateTimeField(
        verbose_name='date joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
    language = models.CharField(
        verbose_name='language', max_length=2, choices=LANGUAGE_CHOICES, default='fa')
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = MyAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'language']

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser

    def __str__(self):
        return self.email


class EnSent(models.Model):
    text = models.CharField(max_length=100, default='', unique=True)

    def __str__(self):
        return self.text


class CnSent(models.Model):
    text = models.CharField(max_length=100, default='')
    ensent = models.ForeignKey(EnSent, on_delete=models.CASCADE)
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    point = models.IntegerField(default=0)

    class Meta:
        unique_together = ('ensent', 'user')

    def __str__(self):
        return self.text


class EsSent(models.Model):
    text = models.CharField(max_length=100, default='')
    ensent = models.ForeignKey(EnSent, on_delete=models.CASCADE)
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    point = models.IntegerField(default=0)

    class Meta:
        unique_together = ('ensent', 'user')

    def __str__(self):
        return self.text


class HiSent(models.Model):
    text = models.CharField(max_length=100, default='')
    ensent = models.ForeignKey(EnSent, on_delete=models.CASCADE)
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    point = models.IntegerField(default=0)

    class Meta:
        unique_together = ('ensent', 'user')

    def __str__(self):
        return self.text


class BnSent(models.Model):
    text = models.CharField(max_length=100, default='')
    ensent = models.ForeignKey(EnSent, on_delete=models.CASCADE)
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    point = models.IntegerField(default=0)

    class Meta:
        unique_together = ('ensent', 'user')

    def __str__(self):
        return self.text


class PtSent(models.Model):
    text = models.CharField(max_length=100, default='')
    ensent = models.ForeignKey(EnSent, on_delete=models.CASCADE)
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    point = models.IntegerField(default=0)

    class Meta:
        unique_together = ('ensent', 'user')

    def __str__(self):
        return self.text


class RuSent(models.Model):
    text = models.CharField(max_length=100, default='')
    ensent = models.ForeignKey(EnSent, on_delete=models.CASCADE)
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    point = models.IntegerField(default=0)

    class Meta:
        unique_together = ('ensent', 'user')

    def __str__(self):
        return self.text


class JpSent(models.Model):
    text = models.CharField(max_length=100, default='')
    ensent = models.ForeignKey(EnSent, on_delete=models.CASCADE)
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    point = models.IntegerField(default=0)

    class Meta:
        unique_together = ('ensent', 'user')

    def __str__(self):
        return self.text


class TrSent(models.Model):
    text = models.CharField(max_length=100, default='')
    ensent = models.ForeignKey(EnSent, on_delete=models.CASCADE)
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    point = models.IntegerField(default=0)

    class Meta:
        unique_together = ('ensent', 'user')

    def __str__(self):
        return self.text


class KoSent(models.Model):
    text = models.CharField(max_length=100, default='')
    ensent = models.ForeignKey(EnSent, on_delete=models.CASCADE)
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    point = models.IntegerField(default=0)

    class Meta:
        unique_together = ('ensent', 'user')

    def __str__(self):
        return self.text


class FrSent(models.Model):
    text = models.CharField(max_length=100, default='')
    ensent = models.ForeignKey(EnSent, on_delete=models.CASCADE)
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    point = models.IntegerField(default=0)

    class Meta:
        unique_together = ('ensent', 'user')

    def __str__(self):
        return self.text


class DeSent(models.Model):
    text = models.CharField(max_length=100, default='')
    ensent = models.ForeignKey(EnSent, on_delete=models.CASCADE)
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    point = models.IntegerField(default=0)

    class Meta:
        unique_together = ('ensent', 'user')

    def __str__(self):
        return self.text


class FaSent(models.Model):
    text = models.CharField(max_length=100, default='')
    ensent = models.ForeignKey(EnSent, on_delete=models.CASCADE)
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    point = models.IntegerField(default=0)

    class Meta:
        unique_together = ('ensent', 'user')

    def __str__(self):
        return f"{self.text}-{self.point}-{self.user}"


class ArSent(models.Model):
    text = models.CharField(max_length=100, default='')
    ensent = models.ForeignKey(EnSent, on_delete=models.CASCADE)
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    point = models.IntegerField(default=0)

    class Meta:
        unique_together = ('ensent', 'user')

    def __str__(self):
        return self.text


class IdSent(models.Model):
    text = models.CharField(max_length=100, default='')
    ensent = models.ForeignKey(EnSent, on_delete=models.CASCADE)
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    point = models.IntegerField(default=0)

    class Meta:
        unique_together = ('ensent', 'user')

    def __str__(self):
        return self.text


class NlSent(models.Model):
    text = models.CharField(max_length=100, default='')
    ensent = models.ForeignKey(EnSent, on_delete=models.CASCADE)
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    point = models.IntegerField(default=0)

    class Meta:
        unique_together = ('ensent', 'user')

    def __str__(self):
        return self.text


class SenCard(models.Model):
    Qtext = models.CharField(max_length=100, default='')
    Atext = models.CharField(max_length=30, default='')
    CERF = models.CharField(max_length=2, default='')
    morph = models.CharField(max_length=100, default='')
    succeed = models.FloatField(default=1)
    reviewed = models.IntegerField(default=1)
    ansrate = models.FloatField(default=1)
    data_created = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    sent = models.ForeignKey(EnSent, on_delete=models.CASCADE)
    likes = models.ManyToManyField(
        Account, through='LikeTable', related_name='card_user_likes')

    class Meta:
        unique_together = ('Qtext', 'Atext')

    def __str__(self):
        return self.Qtext


class UserProfile(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    points = models.PositiveIntegerField(default=100)
    saves = models.ManyToManyField(
        SenCard, through='SaveTable', related_name='card_user_saves')
    shares = models.ManyToManyField(
        SenCard, through='ShareTable', related_name='card_user_shares')
    reads = models.ManyToManyField(
        SenCard, through='ReadTable', related_name='card_user_reads')


class LikeTable(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    card = models.ForeignKey(SenCard, on_delete=models.CASCADE)
    date_liked = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'card')


class SaveTable(models.Model):
    userProf = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    card = models.ForeignKey(SenCard, on_delete=models.CASCADE)
    date_saved = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('userProf', 'card')


class ShareTable(models.Model):
    userProf = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    card = models.ForeignKey(SenCard, on_delete=models.CASCADE)
    date_shared = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('userProf', 'card')


class ReadTable(models.Model):
    userProf = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    card = models.ForeignKey(SenCard, on_delete=models.CASCADE)
    date_read = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('userProf', 'card')


class ReportTable(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    card = models.ForeignKey(SenCard, on_delete=models.CASCADE)
    text = models.CharField(max_length=500, default='')
    date_reported = models.DateTimeField(auto_now=True)
