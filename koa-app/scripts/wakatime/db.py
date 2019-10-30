#!/usr/bin/env python3
# -*- conding:utf-8 -*-

"""
db function
"""

__author__ = 'yanGo'

# pip install PyMysql
import pymysql

config = {
    'host': 'localhost',
    'port': 3306,
    'user': 'root',
    'password': 'ylone666',
    'db': 'gro-up',
    'charset': 'utf8mb4'
}


def query(sql, params=None):
    connection = pymysql.connect(cursorclass=pymysql.cursors.DictCursor, **config)
    try:
        with connection.cursor() as cursor:
            # Create a new record
            cursor.execute(sql, params)
            # INSERT 语句需要 commit
            connection.commit()
            result = cursor.fetchall()
            return result
    except Exception as e:
        raise
    finally:
        connection.close()


# 因为 insert/update 一次只能执行一条添加操作，因此将事务进行缓存，用于一次提交
def insert(list, params=None):
    connection = pymysql.connect(cursorclass=pymysql.cursors.DictCursor, **config)
    try:
        with connection.cursor() as cursor:
            if len(list) > 0:
                for sql in list:
                    cursor.execute(sql, params)
                connection.commit()
                result = cursor.fetchall()
                return result
    except Exception as e:
        raise
    finally:
        connection.close()
