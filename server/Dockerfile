FROM python:3

ENV PYTHONFAULTHANDLER=1 \
  PYTHONUNBUFFERED=1 \
  PYTHONHASHSEED=random \
  PIP_NO_CACHE_DIR=off \
  PIP_DISABLE_PIP_VERSION_CHECK=on \
  PIP_DEFAULT_TIMEOUT=100 \
  POETRY_VERSION=2.0.1

RUN groupadd user && useradd --create-home --home-dir /home/user -g user user

# Install system dependencies
RUN apt-get update && apt-get install python3-dev gcc build-essential libpq-dev -y

# install python dependencies
RUN pip install "poetry==$POETRY_VERSION"
COPY server/pyproject.toml /home/user/app/
COPY server/*poetry.lock /home/user/app/

WORKDIR /home/user/app/

RUN poetry config virtualenvs.create false
RUN poetry install --no-root --no-interaction --no-ansi

WORKDIR /app/server/
COPY server/ /app/server

USER user
CMD [ "./entrypoint.sh" ]