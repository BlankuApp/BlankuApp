from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from backend.models import Account
from django.contrib.auth import authenticate


class NewUserForm(UserCreationForm):
    email = forms.EmailField(widget=forms.EmailInput(attrs={'class': 'form-control'}),
                             max_length=60)
    username = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'form-control'}), max_length=30)
    lang_choices = (
        ('es', 'Spanish'),
        ('cn', 'Chinese'),
        ('jp', 'Japanese'),
        ('fa', 'Persian'),
        ('hi', 'Hindi'),
        ('pt', 'Portuguese'),
        ('ru', 'Russian'),
        ('tr', 'Turkish'),
        ('ko', 'Korean'),
        ('fr', 'French'),
        ('de', 'German'),
        ('ar', 'Arabic'),
        ('id', 'Indonesian'),
        ('nl', 'Dutch')
    )
    language = forms.ChoiceField(label='First language', choices=lang_choices, widget=forms.Select(
                                 attrs={'class': 'form-control'}))
    password1 = forms.CharField(
        label='Password', widget=forms.PasswordInput(attrs={'class': 'form-control'}))
    password2 = forms.CharField(
        label='Password confirmation', widget=forms.PasswordInput(attrs={'class': 'form-control'}))

    class Meta:
        model = Account
        fields = ('email', 'username',
                  'language', 'password1', 'password2')
        widgets = {
            'email': forms.TextInput(attrs={'class': 'form-control'}),

        }


class AccountAuthenticationForm(AuthenticationForm):
    email = forms.EmailField(widget=forms.TextInput(
        attrs={'class': 'form-control'}))
    password = forms.CharField(
        label='Password', widget=forms.PasswordInput(attrs={'class': 'form-control'}))

    class Meta:
        model = Account
        fields = ('email', 'password')

    def clean(self):
        if self.is_valid():
            email = self.cleaned_data['email']
            password = self.cleaned_data['password']
            if not authenticate(email=email, password=password):
                raise forms.ValidationError("Invalid login")
