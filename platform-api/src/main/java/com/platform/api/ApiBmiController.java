package com.platform.api;/**
 * @author Administrator
 * @create 2018-12-11 14:27
 * @desc BMI指数计算
 **/

import com.platform.annotation.LoginUser;
import com.platform.entity.UserVo;
import com.platform.util.ApiBaseAction;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


/**

 * @author Administrator

 * @create 2018-12-11 14:27

 * @desc BMI指数计算

 **/
@RestController
@RequestMapping("/api/bmi")
public class ApiBmiController extends ApiBaseAction {
    @PostMapping ("getbmi")
    public Object getbmi(@LoginUser UserVo loginUser){

        return toResponsSuccess("success");
    }
}
