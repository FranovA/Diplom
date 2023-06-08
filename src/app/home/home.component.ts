import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  articles = [
    {'id': 0, 'title': 'Люди', 'url': 'people_list', 'url_create': 'people'},
    {'id': 1, 'title': 'Бригады', 'url': 'brigade_list', 'url_create': 'brigade'},
    {'id': 2, 'title': 'Объект', 'url': 'project_list', 'url_create': 'project'},
    {'id': 3, 'title': 'Работы по объектам', 'url': 'project_info_list', 'url_create': 'project_info'},
    {'id': 4, 'title': 'Справочник работ', 'url': 'work_type_list', 'url_create': 'work_type'},
  ];
  tables: any = [ 
    {'name': 'Люди', 'db_name': 'people', 'fields': [{'title': 'id', 'verbose': 'id'}, {'title': 'name', 'verbose': 'ФИО'}, {'title': 'phone', 'verbose': 'Номер телефона'}, {'title': 'job', 'verbose': 'Должность'}, {'title': 'salary', 'verbose': 'Заработная плата'}, {'title': 'passport', 'verbose': 'Паспортные данные'}, {'title': 'requisite', 'verbose': 'Лицевой счёт'}, {'title': 'comment', 'verbose': 'Комментарий'}, {'title': 'is_client', 'verbose': 'Это клиент?'}, {'title': 'brigade', 'verbose': 'Бригада'} ]}, 
    {'name': 'Бригады', 'db_name': 'brigade', 'fields':[{'title': 'id', 'verbose': 'id'},{'title': 'code', 'verbose': 'Номер бригады'}]}, 
    {'name': 'Объект', 'db_name': 'project', 'fields':[{'title': 'id', 'verbose': 'id'}, {'title': 'address', 'verbose': 'Адрес объекта'}, {'title': 'client', 'verbose': 'Код клиента'}, {'title': 'technical', 'verbose': 'Техническая документация'}]}, 
    {'name': 'Работы по объектам', 'db_name': 'project_info', 'fields':[{'title':'id', 'verbose': 'id'}, {'title': 'works', 'verbose': 'id работ'}, {'title': 'project', 'verbose': 'id объекта'}, {'title': 'date_start', 'verbose': 'Дата начала работ'},{'title': 'date_end', 'verbose': 'Дата окончания работ'}, {'title': 'brigade', 'verbose': 'id бригады'}, {'title': 'total_sum', 'verbose': 'Общая сумма заказа'}]}, 
    {'name': 'Справочник работ', 'db_name': 'work_type', 'fields':[{'title': 'id', 'verbose': 'id'}, {'title': 'name', 'verbose': 'Вид работ'}, {'title': 'price', 'verbose': 'Цена за кв2'}]} 
  ];
  selectedCategory = 0;
  selectedTable = 0;
  isAdding = false;

  // newData: any = {
  //   'people': {'id': null, 'title': null, 'phone': null, 'job': null, 'salary': null, 'passport': null, 'requisite': null, 'comment': null, 'brigade': null, 'is_client': 0},
  //   'brigade': {'id': null, 'code': null},
  //   'work_type': {'id': null, 'name': null, 'price': null},
  //   'project_info': {'id': null, 'work': null, 'project': null, 'date_start': null, 'date_end': null, 'brigade': null, 'total_sum': null},
  //   'project': {'id': null, 'address': null, 'client': null}
  // }
  newData: any = {};
  data: any = [];

  queries: any = [
    {'id': 0, 'title': 'Поиск человека по ФИО', 'table': 'people_by_name', 'search': 'Введите ФИО'},
    {'id': 1, 'title': 'Информация об объекте', 'table': 'project_info_by_address', 'search': 'Введите адрес объекта'},
    // {'id': 2, 'title': 'Кто в бригаде', 'table': 'people', 'search': 'Введите код бригады'},
    {'id': 2, 'title': 'Какая бригада на объекте', 'table': 'project_brigade_by_address', 'search': 'Введите адрес объекта'}
  ]
  reports: any = [
    {'id': 0, 'title': 'По законченным объектам', 'url': 'projects_done', 'search': 'Введите дату окончания', 'key': 'date', 'data': null},
    {'id': 1, 'title': 'По зарплате работников', 'url': 'people_salary', 'search': 'Введите ФИО работника', 'key': 'search', 'data': null},
    {'id': 2, 'title': 'По стоимости объекта', 'url': 'project_sum_by_address', 'search': 'Введите адрес объекта', 'key': 'search', 'data': null},
    {'id': 3, 'title': 'По проделанным работам', 'url': 'project_works_by_address', 'search': 'Введите адрес объекта', 'key': 'search', 'data': null},
  ]
  queryData: any = '';
  reportData: any = '';
  selectedQuery = 0;
  selectedReport = 0;

  editRow: any = null;

  queryTable: any = [];
  reportTable: any = [];

  comment: any = '';

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.getTableData('people_list');
  }

  public getTableData(url: string)
  {
    this.http.get(`http://127.0.0.1:8000/${url}`).subscribe(result => {
      this.data = result;
      console.log(this.data);
    });
  }

  public openArticle(id: number)
  {
    this.router.navigateByUrl('/article/' + id);
  }

  public addRow() {
    let selectedTable = this.articles[this.selectedTable]['url_create'];
    this.http.post(`http://127.0.0.1:8000/${selectedTable}/`, this.newData).subscribe(result => {
      console.log(result);
      // this.newData = {};
      this.getTableData(this.articles[this.selectedTable]['url']);
      this.comment = 'Запись добавлена';
      // this.isAdding = false;
      setTimeout(() => {
        this.comment = '';
      }, 3000)
    })
  }

  public onNewDataChange(key: any, value: any)
  {
    this.newData[key] = value;
  }

  public deleteRow()
  {
    let selectedTable = this.tables[this.selectedTable]['db_name']
    this.http.delete(`http://127.0.0.1:8000/${selectedTable}/${this.data[selectedTable]['id']}`).subscribe(result => {
      console.log(result)
    })
  }

  // public editData(id: any)
  // {
  //   this.data[id][key] = data
  // }


  public editQuery(data: any)
  {
    this.queryData = data;
  }

  public searchQuery()
  {
    let selectedQuery = this.queries[this.selectedQuery];
    this.http.get(`http://127.0.0.1:8000/${selectedQuery['table']}?search=${this.queryData}`).subscribe(result => {
      this.queryTable = result;
      console.log(result)
    });
  }

  public onFieldChange(id: any, key: any, value: any)
  {
    this.data[id][key] = value;
  }

  public deleteDataRow(id: any)
  {
    this.data.splice(id, 1);
  }

  public editReport(data: any)
  {
    this.reportData = data;
  }

  public searchReport()
  {
    let selectedReport = this.reports[this.selectedReport];
    let url = `http://127.0.0.1:8000/${selectedReport['url']}`;
    if (selectedReport['key'] != null) url += `?${selectedReport['key']}=${this.reportData}`;
    this.http.get(url).subscribe(result => {
      this.reportTable = result;
      console.log(result)
    });
  }

  public test()
  {
    this.http.get('http://127.0.0.1:8000/people_list').subscribe(result => {
      console.log(result);
    });
  }
}
