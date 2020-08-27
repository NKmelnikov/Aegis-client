import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';
import {BrandService} from '../../../_services';
import {environment} from '../../../../environments/environment';


@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.scss']
})
export class CatalogItemComponent implements OnInit {

  public brand = {
    description: '',
    catalogs: []
  };

  public page = 1;
  public pageSize = 8;
  public env = environment;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private brandService: BrandService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((param: any) => {
      if (!_.isEmpty(param)) {
        this.brandService.getBrandBySlug(param)
          .subscribe((brand) => {
            // @ts-ignore
            this.brand = brand;
          });
      }
    });
  }
}