package com.entidades.buenSabor.presentation.rest;


import com.entidades.buenSabor.domain.dto.PedidoMP;
import com.entidades.buenSabor.domain.entities.PreferenceMP;
import org.springframework.web.bind.annotation.CrossOrigin;


import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
public class MercadoPagoController {
/*
    public PreferenceMP getPreferenciaIdMercadoPago(PedidoMP pedido){
        try {
            MercadoPagoConfig.setAccessToken("TEST-3480460339675888-052104-977e7a92511436b55bd518943c35e678-316937308");
            PreferenceItemRequest itemRequest = PreferenceItemRequest.builder()
               .id("1234")
               .title(pedido.getTitulo())
               .description("Pedido realizado desde el carrito de compras")
               .pictureUrl("https://img-global.cpcdn.com/recipes/0709fbb52d87d2d7/1200x630cq70/photo.jpg")
               .quantity(1)
               .currencyId("ARG")
               .unitPrice(new BigDecimal(pedido.getMontoTotal()))
               .build();
            List<PreferenceItemRequest> items = new ArrayList<>();
            items.add(itemRequest);

            PreferenceBackUrlsRequest backURL = PreferenceBackUrlsRequest.builder().success("http://localhost:5173/mpsuccess")
                    .pending("http://localhost:5173/mppending").failure("http://localhost:5173/mpfailure").build();

            PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                    .items(items)
                    .backUrls(backURL)
                    .build();
            PreferenceClient client = new PreferenceClient();
            Preference preference = client.create(preferenceRequest);
            
            PreferenceMP mpPreference = new PreferenceMP();
            mpPreference.setStatusCode(preference.getResponse().getStatusCode());
            mpPreference.setId(preference.getId());
            return mpPreference;
                
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        
    }
    */
}
