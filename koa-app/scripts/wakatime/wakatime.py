#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
wakatime scripts
"""

__author__ = 'Y-lonelY'

import json
import requests
import db
import sys
from collections.abc import Iterable


class Wakatime(object):
    url = 'https://wakatime.com/api/v1/users/current/summaries'
    cache = True
    __api_key = 'aa7000e7-273a-4cbe-862c-c3ff4faf2daf'

    def __init__(self, start, end):
        self.start = start
        self.end = end

    """ 通过 wakatime api 获取数据
        根据 api_key 来获取一段时间内的开发数据，api 仅支持最近两周的数据
        Arguments:
            start: 开始时间
            end: 结束时间
    """
    def get_data(self, should_insert=False):
        params = {
            'start': self.start,
            'end': self.end,
            'cache': self.cache,
            'api_key': self.__api_key
        }

        try:
            res = requests.get(self.url, params)
            if res.status_code == 200:
                result = json.loads(res.text)
                if should_insert:
                    self.insert(result)
                else:
                    print(result)
                return result
        except Exception as e:
            print(e)
        finally:
            pass

    # 插入数据库
    def insert(self, result):
        lang_list = []
        pros_list = []
        if isinstance(result['data'], Iterable):
            for i,item in enumerate(result['data']):
                date = item['range']['date']
                lang = item['languages']
                pros = item['projects']
                lang_list = lang_list + self.get_lang_sql(lang, date)
                pros_list = pros_list + self.get_pro_sql(pros, date)
        db.insert(lang_list)
        db.insert(pros_list)

    @classmethod
    def get_lang_sql(cls, lang, date):
        lang_list = []
        if isinstance(lang, Iterable):
            for i,item in enumerate(lang):
                if int(item['total_seconds']) > 0:
                    lang_sql = """
                    INSERT INTO `gro-up`.`waka_lang`(`date`, `name`, `total_seconds`, `text`)
                    VALUES('{}', '{}', {}, '{}');
                    """.format(date, item['name'], int(item['total_seconds']), item['text'])
                    lang_list.append(lang_sql)
                else:
                    pass
        return lang_list

    @classmethod
    def get_pro_sql(cls, pros, date):
        pro_list = []
        if isinstance(pros, Iterable):
            for i,item in enumerate(pros):
                if int(item['total_seconds']) > 0:
                    pro_sql = """
                    INSERT INTO `gro-up`.`waka_project`(`date`, `name`, `total_seconds`, `text`)
                    VALUES('{}', '{}', {}, '{}')
                    """.format(date, item['name'], int(item['total_seconds']), item['text'])
                    pro_list.append(pro_sql)
                else:
                    pass
        return pro_list


if __name__ == "__main__":
    """ 通过 sys 获取传值
        Arguments:
            start: 开始时间
            end: 结束时间
            label: 标记仅展示数据/插入数据进数据库
    """
    try:
        start = sys.argv[1]
        end = sys.argv[2]
        label = sys.argv[3]

        wakaTime = Wakatime(start, end)
        wakaTime.get_data(label)
    except Exception as e:
        pass
    
