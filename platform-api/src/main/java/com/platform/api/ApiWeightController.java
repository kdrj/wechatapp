package com.platform.api;/**
 * @author Administrator
 * @create 2018-12-14 15:02
 * @desc 体重查询
 **/

import com.platform.annotation.LoginUser;
import com.platform.entity.UserVo;
import com.platform.entity.UserWeightVo;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.platform.service.ApiWeightService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**

 * @author Administrator

 * @create 2018-12-14 15:02

 * @desc 体重查询

 **/
@RestController
@RequestMapping("/api/weight")
public class ApiWeightController {
    @Autowired
    private ApiWeightService weightService;

    @ApiOperation("获取体重")
    @PostMapping("queryweightlist")
    public Object getweightlist(@LoginUser UserVo loginuser){
        Map<String,Object> resultObj=new HashMap<>();
        List<UserWeightVo> weightVoList=weightService.queryByUserId(loginuser.getUserId());
        for (UserWeightVo user:weightVoList
             ) {
            System.out.println(user.getWeight());
        }
        resultObj.put("userWeight",weightVoList);
        return resultObj;
    }

}
