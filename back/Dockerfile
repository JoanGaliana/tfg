# Builder container
FROM openjdk:17-jdk-alpine as builder

WORKDIR /usr/src

COPY mvnw* ./
COPY .mvn .mvn
COPY pom.xml .
RUN ./mvnw verify --fail-never

COPY . ./
RUN ./mvnw clean package

# Actual container
FROM openjdk:17-jdk-alpine

COPY --from=builder /usr/src/target/tfg-backend-*-SNAPSHOT.jar tfg-backend.jar

ENTRYPOINT ["java","-jar","/tfg-backend.jar"]