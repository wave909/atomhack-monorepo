
# Модуль управления бизнес-процессами и оргструктурой муниципалитета

## Архитектура

1. packages/web - веб-панель руководителя (React, TypeScript)
2. packages/predict - сервис классификации задач (Python3, NLTK, pymorphy2, Flask)
3. packages/schedule-server - сервис расписаний (Node.JS, Koa, TypeScript)

Микросервисная архитектура служит трём целям
1. Отчуджаемость модулей, возможность собрать в другой конфигурации под реальную среду с внешним таск-трекером
2. Гибкость выбора платформ (например, Python для классификатора используется в силу зрелости решений для Natural Language Processing на нём)
3. Возможность быстро масштабировать

## Заготовки под функции

1. При накоплении хронологии по обращениям, появится возможность
   а. Обучить word embeddings для повышения точности классификации (по сути автосоставление словаря)
   б. Автоматически расчитывать коэфициент производительности сотрудников в соответствии с типами задач 

2. Сервис predict подгружает данные о структуре и словарь из CSV, экспорт которой идёт из Google Sheets
   https://docs.google.com/spreadsheets/d/1ukcpNQa6gO2NLciA24TLFQelq4VFj6wjZgbZ5jpUUUg/edit#gid=0

Тривиально подключить с этой стороны загрузку и внешний редактор орг.структуры и словарей

В качестве альтернативы, орг.структуру можно импортировав из внешнего источника.
Внутри системы CSV со структурой преобразуется в граф на Graphviz; этот формат можно использовать как промежуточный при интеграции.

3. Сейчас если Intent¹ относится к нескольким отделам, каждому создаётся своя копия задачи.
   При работе с реальным таск-трекером, нужно добавить связь между задачами, чтобы обработать регламенты, затрагивающие несколько отделов


¹ - Intent (в контексте задачи Intent Classification) - предопределённый класс для интерпретации сообщения пользователя
https://paperswithcode.com/task/intent-classification

## На развитие

1. Библиотека регламентов обработки задач + редактор (BPMN)
2. Kubernetes + RabbitMQ для масштабирования нагрузки сервиса классификатора задач.
3. Сервисы интеграции с источниками данных (собирать из разных источников в 1 таск-трекер)
4. Сервис агрегации событий для упрощения статистического анализа