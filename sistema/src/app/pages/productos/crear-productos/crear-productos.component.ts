import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.css']
})
export class CrearProductosComponent {

  productoForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private _productoService: ProductoService){
    this.productoForm = this.fb.group({
        producto:  ['', Validators.required],
        categoria: ['', Validators.required],
        ubicacion: ['', Validators.required],
        precio:    ['', Validators.required],
        imagen:    [null] 
    })
  }

  agregarProducto(){

    const imagenFile = this.productoForm.get('imagen')?.value.files[0]; // Recoge el primer archivo de la lista de archivos

    const PRODUCTO: Producto = {
      producto: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
      imagen: imagenFile ? imagenFile : null // Asigna el archivo solo si existe
    }

    console.log(PRODUCTO)

    Swal.fire({
      title: 'Creacion de Producto',
      text: "¿Desea crear el producto?",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Crea un objeto FormData para enviar el archivo de la imagen
        const formData = new FormData();
        formData.append('producto', PRODUCTO.producto);
        formData.append('categoria', PRODUCTO.categoria);
        formData.append('ubicacion', PRODUCTO.ubicacion);
        formData.append('precio', PRODUCTO.precio.toString());
        if (PRODUCTO.imagen) {
            formData.append('imagen', PRODUCTO.imagen);
        }

        this._productoService.guardarProducto(formData).subscribe(data =>{
          console.log(data);  
          this.router.navigate(['/listar-productos'])
        }) 
      }
    })
  }

}
