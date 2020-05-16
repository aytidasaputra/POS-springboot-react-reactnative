// package com.enigma.restservice.controller;

// import org.junit.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.http.MediaType;
// import org.springframework.test.web.servlet.MockMvc;
// import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

// @AutoConfigureMockMvc
// @SpringBootTest
// public class ItemControllerTest {

//     @Autowired
//     private MockMvc mvc;

//     @Test
//     public void shouldHaveItem()throws Exception{
//         mvc.perform(MockMvcRequestBuilders.get("/items/1"))
//         .andExpect(MockMvc.status().isOk())
//         .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
//         .andExpect(JsonPath("1.data.name",is("New Iteem")));
//     }

//     @Test
//     public void shouldAddItem() throws Exception {
//         mvc.perform(requestBuilder)
//     }

// }
