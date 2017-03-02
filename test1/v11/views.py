from django.shortcuts import redirect, render

from .forms import DocumentForm
from .models import Document


# Create your views here.


def file_upload(request):
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('default:file_upload')
    else:
        form = DocumentForm()
        return render(request, 'v11/file_upload_form.html', {
            'form': form
        })
