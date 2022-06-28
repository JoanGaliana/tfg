# Builder container
FROM openjdk:17-jdk-alpine as builder

WORKDIR /usr/src

COPY mvnw* ./
RUN ["chmod", "+x", "mvnw"]

COPY .mvn .mvn
COPY pom.xml .
RUN ./mvnw verify --fail-never

COPY . ./
RUN ["chmod", "+x", "mvnw"]
RUN ./mvnw package

# Actual container
FROM openjdk:17-jdk-alpine

COPY --from=builder /usr/src/target/tfg-backend-*-SNAPSHOT.jar tfg-backend.jar

HEALTHCHECK CMD wget --no-verbose --tries=1 --spider http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["java","-jar","/tfg-backend.jar"]