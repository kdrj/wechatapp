package com.platform.dao;/**
 * @author Administrator
 * @create 2018-12-14 15:34
 * @desc 体重
 **/

import com.platform.entity.UserWeightVo;
import java.util.List;
/**

 * @author Administrator

 * @create 2018-12-14 15:34

 * @desc 体重

 **/
public interface ApiWeightMapper extends BaseDao<UserWeightVo> {
    List<UserWeightVo> queryByUserId(Long userId);
}
