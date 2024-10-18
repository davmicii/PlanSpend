# PlanSpend
Proyecto personal realizado con Angular, Node y PostgreSQL.


PlandSpend v1.0

Proyecto personal realizado para crear tareas, ingresos gastos, pagos y anotaciones.

Tecnologías:
- Base de datos: PostgreSQL 16
- Backend: Node.js con Express, Nodemon
- FrontEnd: Angular v17 con Tailwind, FlowBite


Módulos terminados:
- Users (usuarios):
Se puede registrar y loguear en el sistema para comenzar a usar la aplicación.


- Categories (categorías), Incomes (ingresos), Expenses (gastos):
Estos módulos (incomes y expenses) tienen relación con las categorías, cuando se crea un ingreso o gasto se registra en su categoría correspondiente,
además de solicitar otros datos como el título, la descripción, fecha de gasto o ingreso y monto.

Se puede eliminar la categoría, lo que a su vez eliminará el ingreso o gasto asociado.
Se puede consultar el detalle de alguna categoría, lo que mostrará los datos correspondientes a ese registro.


- Tasks (tareas):
Se registra la tarea que se tiene pendiente por realizar con la fecha de finalización, por defecto la tarea se marca como no completada.
Se puede editar la tarea y, a diferencia del crear, se logra actualizar el estado (completada o no completada).
Se puede eliminar la tarea.


- Notes (notas)
Se pueden crear notas con su título y descripción, la fecha de creación es automática.
En el listado de las notas se pueden agregar como favoritas para darles prioridad.


-Dashboard
Aquí se visualizan los movimientos del usuario, tanto ingresos como egresos ordenados por fecha de pago
