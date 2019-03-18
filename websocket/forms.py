from django import forms


class RemoteForm(forms.Form):
    command = forms.CharField(widget=forms.Textarea)


class MacForm(forms.Form):
    queue = forms.CharField(label='Mac address', max_length=100)


class LogForm(forms.Form):
    log = forms.CharField()


class ConsoleForm(forms.Form):
    command = forms.CharField(widget=forms.Textarea)

