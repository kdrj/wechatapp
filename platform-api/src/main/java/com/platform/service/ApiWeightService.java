package com.platform.service;/**
 * @author Administrator
 * @create 2018-12-14 15:20
 * @desc 体重查询
 **/

import com.platform.dao.ApiWeightMapper;
import com.platform.entity.UserWeightVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


/**

 * @author Administrator

 * @create 2018-12-14 15:20

 * @desc 体重查询

 **/
@Service
public class ApiWeightService {
    @Autowired
    private ApiWeightMapper weightDao;

    public List<UserWeightVo> queryByUserId(Long userId){
        return weightDao.queryByUserId(userId);
    }

    public void save(UserWeightVo userWeightVo){ weightDao.save(userWeightVo);}

    public void delete(Integer id){weightDao.delete(id);}

    public void update(UserWeightVo userWeightVo){weightDao.update(userWeightVo);}

}
