import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import {sqlite3} from 'sqlite3';
//import { open } from 'sqlite';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  articles = [
    {'id': 0, 'title': 'Люди', 'category': 1},
    {'id': 1, 'title': 'Бригады', 'category': 3},
    {'id': 2, 'title': 'Объект', 'category': 2},
    {'id': 3, 'title': 'Работы по объектам', 'category': 1},
    {'id': 4, 'title': 'Справочник работ', 'category': 2},
    //{'id': 5, 'title': 'Общие положения', 'category': 2},
    //{'id': 6, 'title': 'Клиенту', 'category': 1},
    //{'id': 7, 'title': 'О компании', 'category': 1},
  ];
  tables = [
    {'name': 'Люди', 'fields': ['id','Фамилия', 'Имя','Отчество', 'Номер телефона', 'Должность', 'Заработная плата', 'Паспортные данные', 'Лицевой счет', 'Реквизиты банка', 'Примечание' ]},
    {'name': 'Бригады', 'fields':['id', 'Номер бригады', 'id сотрудника']},
    {'name': 'Объект', 'fields':['id', 'Адрес объекта', 'Код клиента', 'Техническая документация']},
    {'name': 'Работы по объектам', 'fields':['id', 'id работ', 'id объекта', 'Дата начала работ', 'Дата окончания работ', 'id бригады', 'Общая сумма заказа']},
    {'name': 'Справочник работ', 'fields':['id', 'Вид работ', 'Цена за кв2']}
  ];
  selectedCategory = 0;
  selectedTable = 0;
  isAdding = true;

  people = {'id': '', 'Имя': ''}

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public openArticle(id: number)
  {
    this.router.navigateByUrl('/article/' + id);
  }

  public addRow() {
   // (async () => {
      // open the database
      //const db = await open({
      //  filename: 'C:/Projects/Diplom/database.db',
      //  driver: this.sql.Database
      //  await db.exec('CREATE TABLE tbl (col TEXT)')
      //  await db.exec('INSERT INTO tbl VALUES ("test")')
     // })
  //})()
  }
}
