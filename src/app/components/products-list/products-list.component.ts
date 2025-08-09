// products-list.component.ts
import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ProductComponent } from "../product/product.component";
import { Product } from "../../types/product";
import { ServiceService } from "../../services/service.service";

@Component({
  selector: "app-products-list",
  standalone: true,
  imports: [CommonModule, FormsModule, ProductComponent],
  templateUrl: "./products-list.component.html",
  styleUrls: ["./products-list.component.css"],
})
export class ProductsListComponent implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  currentPage = 1;
  itemsPerPage = 8;
  searchTerm = "";
  selectedCategory = "";
  selectedBrand = "";
  minPrice: number | null = null;
  maxPrice: number | null = null;
  categories: string[] = [];
  brands: string[] = [];
  isLoading = true;
  error: string | null = null;
  currentYear: number = new Date().getFullYear();

  constructor(private productService: ServiceService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.error = null;

    this.productService.getAllItems().subscribe({
      next: (data) => {
        this.allProducts = data.products;
        this.filteredProducts = [...this.allProducts];
        this.categories = [...new Set(this.allProducts.map((p) => p.category))];
        this.brands = [
          ...new Set(this.allProducts.map((p) => p.brand).filter((b) => b)),
        ];
        this.isLoading = false;
        this.applyFilters();
      },
      error: (err) => {
        this.error = "Failed to load products. Please try again later.";
        this.isLoading = false;
        console.error("Error loading products:", err);
      },
    });
  }

  applyFilters() {
    this.filteredProducts = this.allProducts.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory =
        !this.selectedCategory || product.category === this.selectedCategory;
      const matchesBrand =
        !this.selectedBrand || product.brand === this.selectedBrand;
      const matchesPrice =
        (!this.minPrice || product.price >= this.minPrice) &&
        (!this.maxPrice || product.price <= this.maxPrice);

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });
    this.currentPage = 1;
  }

  resetFilters() {
    this.searchTerm = "";
    this.selectedCategory = "";
    this.selectedBrand = "";
    this.minPrice = null;
    this.maxPrice = null;
    this.applyFilters();
  }

  get paginatedProducts(): Product[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
    window.scrollTo(0, 0);
  }
}
