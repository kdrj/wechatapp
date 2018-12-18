package com.platform.service;/**
 * @author Administrator
 * @create 2018-12-17 10:01
 * @desc 体重
 **/

import com.platform.entity.UserWeightEntity;

import java.util.List;
import java.util.Map;

/**

 * @author Administrator

 * @create 2018-12-17 10:01

 * @desc 体重

 **/
public interface WeightService {
    UserWeightEntity queryObject(Integer id);
    /**
     * 查询
     * @param map
     * @return
     */
    List<UserWeightEntity> queryList(Map<String,Object> map);

    /**
     * 增加
     * @param userWeightEntity
     * @return
     */
    int save(UserWeightEntity userWeightEntity);

    /**
     * 修改
     * @param userWeightEntity
     * @return
     */
    int update(UserWeightEntity userWeightEntity);

    /**
     * 删除
     * @param ids
     * @return
     */
    int deletebatch(Integer[] ids);
}
