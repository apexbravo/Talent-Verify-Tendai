from django.test import TestCase
from django.urls import reverse
from .models import Employee, Company
from .forms import EmployeeUpdateForm, EmployeeBulkUpdateForm


class EmployeeUpdateTest(TestCase):
    def setUp(self):

        self.company = Company.objects.create(
            full_name='Netone',
            date_of_registration='2023-12-02',
            company_registration_number='12323445',
            address='123 Main Street',
            contact_person='Jane Doe',
            departments='IT, Computer Science',
            number_of_employees=22,
            contact_phone='123-456-7890',
            email_address='netone@company.com',
        )

        self.employee = Employee.objects.create(
            company=self.company,
            name='John Doe',
            employee_id='001',
            department='HR',
            role='Manager',
            date_started='2023-01-01',
        )

    def test_employee_update_view(self):
        url = reverse('employee_update', args=[self.employee.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Update Employee Information')
        self.assertIsInstance(response.context['form'], EmployeeUpdateForm)

        # Test updating employee information
        updated_data = {
            'name': 'John Simango',
            'employee_id': '002',
            'department': 'Finance',
            'role': 'Accountant',
            'date_started': '2023-12-01',
            'date_left': '2022-06-30',
            'duties': 'Financial reporting',
        }
        response = self.client.post(url, data=updated_data)
        self.assertRedirects(response, reverse('employee_list'))

        # Check that the employee data has been updated in the database
        updated_employee = Employee.objects.get(id=self.employee.id)
        self.assertEqual(updated_employee.name, 'John Simango')
        self.assertEqual(updated_employee.employee_id, '002')
        self.assertEqual(updated_employee.department, 'Finance')
        self.assertEqual(updated_employee.role, 'Accountant')
        self.assertEqual(str(updated_employee.date_started), '2023-12-01')
        self.assertEqual(str(updated_employee.date_left), '2022-06-30')
        self.assertEqual(updated_employee.duties, 'Financial reporting')


class TalentVerifyAdminUpdateSingleTest(TestCase):
    def setUp(self):
        # Create a sample company
        self.company = Company.objects.create(
            full_name='new company',
            date_of_registration='2023-01-01',
            company_registration_number='67890',
            address='456 Main Street',
            contact_person='Jane Doe',
            departments='IT, Marketing',
            number_of_employees=50,
            contact_phone='987-654-3210',
            email_address='new@companyxyz.com',
        )

        # Create a sample employee belonging to the company
        self.employee = Employee.objects.create(
            company=self.company,
            name='Jane Smith',
            employee_id='003',
            department='IT',
            role='Developer',
            date_started='2022-12-01',
        )

    def test_talent_verify_admin_update_single_view(self):
        url = reverse('talent_verify_admin_update_single',
                      kwargs={'employee_id': self.employee.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Update Employee Information')
        self.assertIsInstance(response.context['form'], EmployeeUpdateForm)

        # Test updating employee information
        updated_data = {
            'name': 'Jane Doe',
            'employee_id': '004',
            'department': 'Marketing',
            'role': 'Manager',
            'date_started': '2022-11-01',
            'date_left': '2023-07-31',
            'duties': 'Marketing strategy',
        }
        response = self.client.post(url, data=updated_data)
        self.assertRedirects(response, reverse('employee_list'))

        # Check that the employee data has been updated in the database
        updated_employee = Employee.objects.get(id=self.employee.id)
        self.assertEqual(updated_employee.name, 'Jane Doe')
        self.assertEqual(updated_employee.employee_id, '004')
        self.assertEqual(updated_employee.department, 'Marketing')
        self.assertEqual(updated_employee.role, 'Manager')
        self.assertEqual(str(updated_employee.date_started), '2022-11-01')
        self.assertEqual(str(updated_employee.date_left), '2023-07-31')
        self.assertEqual(updated_employee.duties, 'Marketing strategy')
