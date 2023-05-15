package com.test.testpractico.services;

import com.test.testpractico.models.User;
import com.test.testpractico.models.UserResponse;
import com.test.testpractico.repositories.InUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.client.RestTemplate;

import javax.net.ssl.*;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.*;

@Service
public class UserService {

    private RestTemplate restTemplate;
    @Autowired
    private InUserRepo repoUser;

    public UserService() {
        restTemplate = createRestTemplate();
    }
    private RestTemplate createRestTemplate() {
        try {
            // Desactivar la validación del certificado SSL
            disableSSLValidation();

            SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
            return new RestTemplate(requestFactory);
        } catch (Exception e) {
            throw new RuntimeException("Error al crear RestTemplate", e);
        }
    }

    private void disableSSLValidation() throws Exception {
        // Crear un SSLContext que confíe en todos los certificados
        SSLContext sslContext = SSLContext.getInstance("TLS");
        sslContext.init(null, trustAllCerts, new java.security.SecureRandom());

        // Configurar la conexión HTTPS para utilizar el SSLContext personalizado
        HttpsURLConnection.setDefaultSSLSocketFactory(sslContext.getSocketFactory());

        // Desactivar la validación del nombre de host
        HostnameVerifier allHostsValid = (hostname, session) -> true;
        HttpsURLConnection.setDefaultHostnameVerifier(allHostsValid);
    }

    private static TrustManager[] trustAllCerts = new TrustManager[]{
            new X509TrustManager() {
                public X509Certificate[] getAcceptedIssuers() {
                    return null;
                }
                public void checkClientTrusted(X509Certificate[] certs, String authType) {
                }
                public void checkServerTrusted(X509Certificate[] certs, String authType) throws CertificateException {
                }
            }
    };

    public List<User> getUsers() {
        ResponseEntity<UserResponse> response = restTemplate.exchange("https://randomuser.me/api/?results=10", HttpMethod.GET, null, UserResponse.class);
        List<User> users = response.getBody().getResults();
        users.sort(Comparator.comparing(u -> u.getName().getFirst()));
        return users;
    }
    public List<User> getUsersByAge(@PathVariable int age) {


        ResponseEntity<UserResponse> response = restTemplate.exchange("https://randomuser.me/api/?results=1", HttpMethod.GET, null, UserResponse.class);
        List<User> users = response.getBody().getResults();



        List<User> filteredUsers = new ArrayList<>();
        for (User user : users) {
            if (user.getDob().getAge() > age) {
                filteredUsers.add(user);
            }
        }
        return filteredUsers;
    }

    public List<User> getCountLetters() {
        ResponseEntity<UserResponse> response = restTemplate.exchange("https://randomuser.me/api/?results=5", HttpMethod.GET, null, UserResponse.class);
        List<User> users = response.getBody().getResults();

        for (User user: users){
            String nombreCompleto = user.getName().getFirst() + " " + user.getName().getLast();
            Map<Character, Integer> letrasContador = new HashMap<>();
            String nombreCompletoSinEspacios = nombreCompleto.replace(" ", "").toLowerCase();

            for (char c : nombreCompletoSinEspacios.toCharArray()) {
                letrasContador.put(c, letrasContador.getOrDefault(c, 0) + 1);
            }
            char letraMasUsada = ' ';
            int maxContador = 0;
            for (Map.Entry<Character, Integer> entry : letrasContador.entrySet()) {
                if (entry.getValue() > maxContador) {
                    maxContador = entry.getValue();
                    letraMasUsada = entry.getKey();
                }
            }
            user.setRepLetter(String.valueOf(letraMasUsada));

        }

        return users;
    }

    public User addUser(User u){
        return repoUser.save(u);
    }

    public void deleteUser(String email){
        repoUser.deleteByEmail(email);
    }
    public User getUserByEmail(String email) {
        return repoUser.findByEmail(email);
    }
    public List<User> getAllusers(){
        return repoUser.findAll();
    }

    public User updateUser(User user) {
        return repoUser.save(user);
    }






}
