package pl.piasta.bbiu.config;

import java.util.List;

record CorsProperties(
        int maxAge,
        List<String> allowedMethods,
        List<String> allowedHeaders,
        List<String> exposedHeaders
) {}
