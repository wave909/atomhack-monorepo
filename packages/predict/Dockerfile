FROM python
RUN apt-get update && apt-get install -y \
    software-properties-common
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
RUN python -m nltk.downloader punkt
COPY . .
EXPOSE 1338
ENTRYPOINT ["python"]
CMD ["app.py"]
