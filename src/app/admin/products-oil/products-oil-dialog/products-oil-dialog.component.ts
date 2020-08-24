import {Component, Inject, Injector, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ProductsOilInterface} from '../products-oil.interface';
import {environment} from '../../../../environments/environment';
import * as ClassicEditor from '../../../_helpers/ckeditor';
import {AdminBaseDialogComponent} from '../../admin.base-dialog.component';

// @ts-ignore
@Component({
  selector: 'app-products-oil-dialog',
  templateUrl: './products-oil-dialog.component.html',
  styleUrls: ['./products-oil-dialog.component.scss']
})

export class ProductsOilDialogComponent extends AdminBaseDialogComponent implements OnInit {

  action: string;
  localData: any;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  selectedValue: string;
  selectedValueCategory: string;
  selectedValueSubCategory: string;
  public ckEditorConfig;
  public Editor = ClassicEditor;

  constructor(
    public injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ProductsOilInterface,
    public dialogRef: MatDialogRef<ProductsOilDialogComponent>
  ) {
    super(injector);
    this.localData = {...data};
    this.localData.active = 1;
    this.action = this.localData.action;
  }

  ngOnInit(): void {
    this.ckEditorConfig = {
      ckfinder: {
        uploadUrl: `${environment.serverURL}ck-upload`
      }
    };
    this.localData.description = this.localData.description || '';
    this.localData.spec = this.localData.spec || '';
    console.log(this.localData.category);
  }

  categorySelectChange(category) {
    this.localData.category = category;
  }

  subcategorySelectChange(subcategory) {
    this.localData.subcategory = subcategory;
  }

  doAction() {
    super.doAction(this.dialogRef);
  }

  closeDialog() {
    super.closeDialog(this.dialogRef);
  }

  fileChangeEvent(fileInput: any) {
    return super.fileChangeEvent(fileInput);
  }

  pdfInputChange(fileInput: any, entityPath, entityName) {
    return super.pdfInputChange(fileInput, entityPath, entityName);
  }
}
