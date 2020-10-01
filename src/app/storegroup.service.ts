import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class StoreGroupService {
  StoreGroups: StoreGroup[] = new Array<StoreGroup>();

  constructor() {}

  addStoreGroup(storeGroup: StoreGroup): Observable<boolean> {
    this.StoreGroups.push(storeGroup);
    return of(true);
  }

  getAll(): Observable<StoreGroup[]> {
    return of(this.StoreGroups);
  }

  addStoreToStoreGroup(
    storeGroupId: number,
    store: Store
  ): Observable<boolean> {
    this.StoreGroups[storeGroupId].Stores.push(store);
    return of(true);
  }

  isValidName(name): Observable<boolean> {
    return name === "name" ? of(true) : of(false);
  }
}

export class Store {
  Name: string;
}

export class StoreGroup {
  Name: string;
  Stores: Store[];
}
