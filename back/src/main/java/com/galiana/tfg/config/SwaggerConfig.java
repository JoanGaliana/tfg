package com.galiana.tfg.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public GroupedOpenApi apiGroup() {
        return GroupedOpenApi
                .builder()
                .group("Api")
                .pathsToMatch("/**")
                .build();
    }

    private List<Server> getServers() {
        final Server localServer = new Server();
        localServer.setUrl("http://localhost:8080");
        localServer.setDescription("Development server");

        final Server preServer = new Server();
        preServer.setUrl("https://pre-back.tfg.joangaliana.com/");
        preServer.setDescription("Preproduction server");

        final Server prodServer = new Server();
        prodServer.setUrl("https://back.tfg.joangaliana.com/");
        prodServer.setDescription("Production server");

        return List.of(
                localServer,
                preServer,
                prodServer
        );
    }

    @Bean
    public OpenAPI apiInfo() {
        final String securitySchemeName = "bearerAuth";

        return new OpenAPI()
                .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
                .components(
                        new Components()
                                .addSecuritySchemes(securitySchemeName,
                                        new SecurityScheme()
                                                .name(securitySchemeName)
                                                .type(SecurityScheme.Type.HTTP)
                                                .scheme("bearer")
                                                .bearerFormat("JWT")))
                .info(
                        new Info()
                                .title("TFG")
                                .description("Joan Galiana Magán")
                                .version("1.0")
                ).
                servers(getServers());
    }
}
