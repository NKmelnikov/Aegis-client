import {Component, OnInit, ViewChild} from '@angular/core';
import {BrandService, CategoryService, ProductOilService, DataService} from '../../_services';
import {MatAccordion} from '@angular/material/expansion';


@Component({
  selector: 'app-products-oil',
  templateUrl: './products-oil.component.html',
  styleUrls: ['./products-oil.component.scss']
})
export class ProductsOilHomeComponent implements OnInit {

  readonly typeOil = 1;

  public productsOilList = [];
  public productsToShow = [];
  public categoryList = [];
  public brandList = [];
  public selectedCategory;
  public selectedCategoryNameToShow = 'Все продукты';
  public selectedIndex;

  brandCategory = {
    id: 1,
    active: 1,
    description: '',
    name: 'Брэнды',
    type: 1,
    isBrand: true,
    createdAt: {$date: 1594916708310},
    position: 999,
    subCategories: [],
  };


  @ViewChild('accordion') accordion: MatAccordion;

  constructor(
    private categoryService: CategoryService,
    private brandService: BrandService,
    private productOilService: ProductOilService,
    private dataService: DataService,
  ) {

  }

  ngOnInit(): void {
    this.getCategoryList();
    this.getProductsOilList();
  }

  getCategoryList() {
    this.categoryService.getAll()
      .subscribe(categoryList => {
        this.categoryList = categoryList.filter((el) => {
          return el.type === this.typeOil;
        });

        this.categoryList.push(this.brandCategory);

        this.brandService.getAll()
          .subscribe(brandList => {
            this.brandList = brandList;
            this.categoryList[this.categoryList.length - 1].subcategories = this.brandList;
          });
      });
  }

  getProductsOilList() {
    this.productOilService.getAll()
      .subscribe(productsOilList => {
        this.productsOilList = productsOilList;
        this.productsToShow = this.productsOilList;
        this.dataService.showProducts(this.productsToShow);
      });
  }

  selectCategory(item) {
    const expansionDOM = document.getElementById(item.id);
    const isExpanded = expansionDOM.classList.contains('mat-expanded');

    item.isExpanded = true;

    if (item.subCategories) {
      item.subCategories.forEach(el => {
        el.activeClass = false;
      });
    }

    if (this.selectedCategory === item.name && !isExpanded) {
      this.productsToShow = this.productsOilList;
      this.selectedCategoryNameToShow = 'Все продукты';
    } else {
      this.selectedCategory = item.name;
      this.selectedCategoryNameToShow = item.name;
      this.productsToShow = this.productsOilList;
      if (!item.isBrand) {
        this.productsToShow = this.productsToShow.filter((el) => {
          return el.category_id === item.id;
        });
      }
    }

    this.dataService.showProducts(this.productsToShow);
  }

  selectSubCategory(subcategory, list) {
    list.forEach(el => {
      el.activeClass = false;
    });

    subcategory.activeClass = true;
    this.selectedCategoryNameToShow = subcategory.name;
    this.productsToShow = this.productsOilList;
    this.productsToShow = this.productsToShow.filter((el) => {
      if (el.subcategory !== 'null') {
        return el.subcategory_id === subcategory.id || el.brand_id === subcategory.id;
      }
    });


    this.dataService.showProducts(this.productsToShow);
  }
}
