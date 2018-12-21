package com.platform.service.impl;/**
 * @author Administrator
 * @create 2018-12-17 10:07
 * @desc 体重
 **/

import com.platform.dao.UserWeightDao;
import com.platform.entity.UserWeightEntity;
import com.platform.service.WeightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**

 * @author Administrator

 * @create 2018-12-17 10:07

 * @desc 体重

 **/
@Service
public class WeightServiceImpl implements WeightService {

    @Autowired
    private UserWeightDao weightDao;
    @Override
    public UserWeightEntity queryObject(Integer id){
        return weightDao.queryObject(id);
    }

    @Override
    public List<UserWeightEntity> queryList(Map<String, Object> map) {
        return weightDao.queryList(map);
    }

    @Override
    public int save(UserWeightEntity userWeightEntity) {
        userWeightEntity.setCreateDate(new Date());
        return weightDao.save(userWeightEntity);
    }

    @Override
    public int update(UserWeightEntity userWeightEntity) {
        userWeightEntity.setCreateDate(new Date());
        return weightDao.update(userWeightEntity);
    }

    @Override
    public int deletebatch(Integer[] ids) {
        return weightDao.delete(ids);
    }
}
