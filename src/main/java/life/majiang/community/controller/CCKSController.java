package life.majiang.community.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CCKSController {
    @GetMapping("/ccks")
    public String ccks(){
        return "ccks";
    }
}
