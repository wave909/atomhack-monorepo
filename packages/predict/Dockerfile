FROM python
RUN apt-get update && apt-get install -y \
    software-properties-common
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
ENTRYPOINT ["python"]
CMD ["app.py"]
