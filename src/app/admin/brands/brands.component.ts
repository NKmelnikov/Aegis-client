import {Component, OnInit, ViewChild, Injector} from '@angular/core';
import {MatTableDataSource, MatTable} from '@angular/material';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {BrandsDialogComponent} from './brands-dialog/brands-dialog.component';
import {BrandsInterface} from './brands.interface';
import {AdminBaseComponent} from '../admin.base-component';


@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent extends AdminBaseComponent implements OnInit {

  constructor(private injector: Injector) {
    super(injector);
  }

  public brands;

  public preloadData = [{
    _id: {$oid: 'noData'},
    createdAt: {$date: 111111111111111},
    position: 1,
    active: 0,
    brandImgPath: '/noData',
    brandName: 'noData',
  }];

  public displayedColumns: string[] = [
    'select',
    'position',
    'active',
    'brandName',
    'brandImgPath',
    'createdAt',
    'action'
  ];

  @ViewChild('table', {static: true}) table: MatTable<BrandsInterface>;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.preloadData);
    this.refreshTable();
  }

  refreshTable() {
    this.brands = this.brandService.getAll()
      .subscribe(data => {
        this.refreshTableRoutine();
        this.dataSource = new MatTableDataSource(data);
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    super.drop(event, this.brandService);
  }

  onBulkActionChange($event) {
    super.onBulkActionChange($event, this.brandService);
  }

  openDialog(action, obj?) {
    super.openDialog(action, obj, this.brandService, BrandsDialogComponent);
  }

}
